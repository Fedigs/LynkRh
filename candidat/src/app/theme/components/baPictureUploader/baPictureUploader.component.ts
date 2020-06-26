import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer,OnInit} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import {CandidatService} from './../../../candidat.service';
@Component({
  selector: 'ba-picture-uploader',
  styleUrls: ['./baPictureUploader.scss'],
  templateUrl: './baPictureUploader.html',
})
export class BaPictureUploader implements OnInit{

  @Input() defaultPicture:string = '';
  @Input() picture:string = '';
  @Input() uploaderOptions:NgUploaderOptions = { url: '' };
  @Input() canDelete:boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload:ElementRef;

  public uploadInProgress:boolean;

  constructor(private renderer: Renderer,private service:CandidatService) {
  }
ngOnInit(){
  this.picture=this.service.baseUrl+"/candidat/photo";
}
  beforeUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
      this.uploaderOptions.url=this.service.uploadUrl;
      this.service.uploadPhoto(file).subscribe(res=>{

      })
    }
  }

  bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture():boolean {
    this.picture = '';
    this.removePhotoToServer();
    return false;
  }
removePhotoToServer(){
this.service.removePhoto().subscribe(res=>{

})
}
  _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

}
