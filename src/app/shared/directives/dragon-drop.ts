import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragonDrop]',
})
export class DragonDrop {
  @Output() fileDropped:EventEmitter<File> = new EventEmitter

  @HostBinding('class.fileover')
  fileover = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.fileover = true;
  }

    @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.fileover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    const file = event.dataTransfer?.files?.[0];

    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    this.fileover = true;
    this.fileDropped.emit(event.dataTransfer.files[0]);
  }
}
