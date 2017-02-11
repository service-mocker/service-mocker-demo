#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into $TEMP_DIR/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
TEMP_DIR="__temp_dir__"
git clone $REPO $TEMP_DIR
cd $TEMP_DIR
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH


# Clean out existing contents
git rm --cached -r ./ # If target branch is orphan, we need remove cached files
git clean -f -d # If target branch is orphan, we need remove all untracked files

cd ..
rm -rf $TEMP_DIR/**/* || exit 0

# We can safely skip the build process because we run our deploy script
# after successfully build.

# Copy files
echo "Copying new contents"
cp -r ./build/* ./$TEMP_DIR

# Now let's go have some fun with the cloned repo
cd $TEMP_DIR
git config user.name "$COMMIT_AUTHOR_NAME"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

eval `ssh-agent -s`
chmod 600 ../deploy-key
ssh-add ../deploy-key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH
