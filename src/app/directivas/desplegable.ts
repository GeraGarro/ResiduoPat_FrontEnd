import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '.select-box', // Selecciona elementos con la clase 'select-box'
  standalone:true
})
export class desplegableCustom {

  constructor(private elementRef: ElementRef) {
    
   }

  @HostListener('click') onClick() {
    const selectBox = this.elementRef.nativeElement;
    const selectOption = selectBox.querySelector('.select-option');
    const opcionesLista = selectBox.querySelectorAll('.opciones li');
   
selectBox.classList.toggle('active'); 

  opcionesLista.forEach((opcion: any) => {
    opcion.addEventListener('click', () => {
      const text = opcion.textContent;
      const inputValor = selectBox.querySelector('.select-option input');
      if (inputValor) {
        inputValor.value = text;
      }
      selectOption.classList.remove('active');
    });
  });
}

@HostListener('document:click', ['$event.target']) onDocumentClick(target: any) {
  const selectBox = this.elementRef.nativeElement;
  const isInside = selectBox.contains(target);
  if (!isInside) {
    selectBox.classList.remove('active');
  }
}
}