import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../dto';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}

  public uploadPhoto(travelId: string, file: File): Observable<Photo> {
    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);
    return this.http.post<Photo>(
      `${environment.baseUrlV1}/travel/${travelId}/photo`,
      formData
    );
  }

  public getAllPhotos(travelId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      ` ${environment.baseUrlV1}/travel/${travelId}/photo`
    );
  }

  public getPhoto(travelId: string, photoId: string): Observable<Blob> {
    return this.http.get(
      `${environment.baseUrlV1}/travel/${travelId}/photo/${photoId}`,
      { responseType: 'blob' }
    );
  }

  public deletePhoto(travelId: string, photoId: string): Observable<Photo> {
    return this.http.delete<Photo>(
      `${environment.baseUrlV1}/travel/${travelId}/photo/${photoId}`
    );
  }
}
