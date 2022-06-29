import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Travel } from './dto';

@Injectable()
export class TravelService {
  constructor(private http: HttpClient) {}

  public createTravel(dto: any): Observable<Travel> {
    return this.http.post<Travel>(`${environment.baseUrlV1}/travel`, dto);
  }

  public getAllTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${environment.baseUrlV1}/travel`);
  }

  public getTravel(id: string): Observable<Travel> {
    return this.http.get<Travel>(`${environment.baseUrlV1}/travel/${id}`);
  }

  public updateTravel(id: string, dto: any): Observable<Travel> {
    return this.http.patch<Travel>(`${environment.baseUrlV1}/travel/${id}`, dto);
  }

  public deleteTravel(id: string): Observable<Travel> {
    return this.http.delete<Travel>(`${environment.baseUrlV1}/travel/${id}`);
  }
}
