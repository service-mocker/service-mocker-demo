export class Logger {
  constructor() {
    const pre = this.elem = document.createElement('pre');
    pre.style.cssText = 'padding: 1em; background: #f5f5f5';
  }

  appendTo(parent) {
    if (!parent) return;
    parent.appendChild(this.elem);
  }

  log(content) {
    this.elem.textContent = JSON.stringify(content, null, 2);
  }

  clear() {
    this.elem.textContent = '';
  }
}
