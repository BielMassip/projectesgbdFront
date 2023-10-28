import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Game } from './Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl: string = "http://localhost:8080/apis/game";

  constructor(private http: HttpClient) { }

  // retorna la part del final de la URL
  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  findAll(): Observable<Game[]> {
    const url = this.getFullUrl('findAll');
    return this.http.get<any>(url).pipe(
      map(response => response.content),
      catchError(error => {
        console.error('Error al obtenir dades del joc:', error);
        return throwError(error);
      })
    );
  }

  insertGame(game: Game): Observable<Game> {
    const url = this.getFullUrl('insert');
    return this.http.post<Game>(url, game);
  }

  updateGame(game: Game): Observable<Game> {
    const url = this.getFullUrl('update');
    return this.http.put<Game>(url, game);
  }

  deleteGame(id: number): Observable<Game> {
    const url = this.getFullUrl(`delete/${id}`);
    return this.http.delete<Game>(url);
  }

}