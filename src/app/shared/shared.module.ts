import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, SearchComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
