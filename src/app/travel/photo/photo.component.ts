import {
  Component,
  ElementRef,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../dto';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-travel-my-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  @ViewChild('filechooser')
  private input!: ElementRef;

  public photos: Photo[] = [];
  public toUpload!: File | null;
  public isOpen: boolean = false;
  public imageToShow: any = null;

  private travelId: string = '';

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.travelId = params['id'];
      if (this.travelId) {
        this.photoService
          .getAllPhotos(this.travelId)
          .subscribe((photos: Photo[]) => (this.photos = photos));
      }
    });
  }

  public onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files?.item(
      0
    ) as File;
    if (file) {
      this.toUpload = file;
    }
  }

  public onPicture(id: string) {
    this.photoService.getPhoto(this.travelId, id).subscribe((image: Blob) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(
          reader.result as string
        );
        this.isOpen = true;
      });

      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }

  public upload() {
    if (this.toUpload) {
      this.photoService
        .uploadPhoto(this.travelId, this.toUpload)
        .subscribe((photo: Photo) => {
          if (photo) {
            this.photoService
              .getAllPhotos(this.travelId)
              .subscribe((photos: Photo[]) => {
                this.photos = photos;
              });
            this.input.nativeElement.void = '';
            this.toUpload = null;
          }
        });
    }
  }

  public download(id: string, filename: string) {
    this.photoService.getPhoto(this.travelId, id).subscribe((image: Blob) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const url = this.sanitizer.bypassSecurityTrustUrl(
          reader.result as string
        );
        const a = document.createElement('a');
        a.href = this.sanitizer.sanitize(SecurityContext.URL, url) as string;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }

  public delete(id: string) {
    this.photoService
      .deletePhoto(this.travelId, id)
      .subscribe((photo: Photo) => {
        if (photo) {
          const index = this.photos.findIndex((photo) => photo._id == id);
          if (index > -1) {
            this.photos.splice(index, 1);
          }
        }
      });
  }
}
