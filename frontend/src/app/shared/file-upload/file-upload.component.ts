
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Output() onSelectImage: EventEmitter<File> = new EventEmitter();

  fileControl: FormControl;
  imgUrl: string | ArrayBuffer = null;

  accepts = ".png,.jpeg,.jpg,.pdf,.xlsx,.csv,.doc,.docx";
  maxSize = 3000; // In kilobytes

  file;

  constructor() {
    this.fileControl = new FormControl(this.file, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit() {
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