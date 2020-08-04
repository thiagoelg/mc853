
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Output() onSelectImage: EventEmitter<File> = new EventEmitter();
  @Input() fileTypes: Array<string> = [];

  fileControl: FormControl;
  imgUrl: string | ArrayBuffer = null;

  acceptsList = {
    images: ".png,.jpeg,.jpg",
    documents: ".pdf,.xlsx,.csv,.doc,.docx"
  };
  maxSize = 3000; // In kilobytes
  
  accepts: string = "";
  file;

  constructor() {
    this.fileControl = new FormControl(this.file, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit() {
    if (this.fileTypes) {
      this.fileTypes.forEach((type) => {
        this.accepts = `${this.accepts}${this.accepts.length ? ',' : ''}${this.acceptsList[type]}`;
      });
    } else {
      Object.values(this.acceptsList).forEach((types) => {
        this.accepts = `${this.accepts}${this.accepts.length ? ',' : ''}${types}`;
      });
    }

    this.fileControl.valueChanges.subscribe((file: any) => {
      this.file = file;
      this.onSelectImage.emit(this.file);
      const mimeType = file.type;
      if (mimeType.match(/image\/*/)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgUrl = reader.result;
        };
      } else {
        this.imgUrl = null;
      }
    });
  }
}