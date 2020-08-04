import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { FileUploadService } from 'src/app/shared/file-upload/file-upload.service';
import { UsersService } from '../../users.service';
import { File as FileModel } from 'src/app/models/file';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent {
  newUserImage: File;
  fileTypes = ["images"];

  constructor(
    public dialogRef: MatDialogRef<UserImageComponent>,
    @Inject (MAT_DIALOG_DATA) public data: { user: User },
    private fileUploadSerivce: FileUploadService,
    private userService: UsersService
  ) { }

  onUploadImage() {
    if (this.newUserImage) {
      this.fileUploadSerivce.uploadFile(this.newUserImage).subscribe((newImage: FileModel) => {
        this.userService.updateImage(this.data.user.id, newImage.id).subscribe({
          next: () => {
            this.dialogRef.close();
          }
        });
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
