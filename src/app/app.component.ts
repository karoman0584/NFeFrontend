import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from "./file.service";
import {ToastrService} from "ngx-toastr";
import {ApiResponse, Nfe} from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  file: File | null = null;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  list: Nfe[] = [];

  constructor(private fileService: FileService,
              private toastService: ToastrService) {
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
    }
  }

  ngOnInit(): void {
    this.getAllFiles();
  }

  getAllFiles() {
    this.fileService.getAll().subscribe((response) => {
      this.list = response;
    });
  }

  uploadFile() {
    if (!this.file) {
      return;
    }

    this.fileInput.nativeElement.value = '';

    this.fileService.upload(this.file).subscribe({
      next: (response: ApiResponse) => {
        this.toastService.success(response.message);
        this.getAllFiles();
      },
      error: error => {
        console.log(error);
        this.toastService.error('Aconteceu algum problema na operacao efetuada')
      }
    });
  }

  getNfeStatus(status: string) {
    switch (status) {
      case 'WAITING_PROCESS':
        return 'Aguardando processo';
      case 'ON_PROCESS':
        return 'Em processo';
      case 'PROCESSED_WITH_SUCCESS':
        return 'Processada';
      default:
        return 'Com Erro';
    }
  }
}
