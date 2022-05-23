import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConformationPopupComponent } from './conformation-popup/conformation-popup.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConformationPopupComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, ConformationPopupComponent],
})
export class ComponentsModule { }
