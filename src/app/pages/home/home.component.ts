import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from '../../components/home-components/toolbar/toolbar.component';
import { MapaService } from '../../services/mapa.service';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { CardModulesComponent } from '../../components/card-modules/card-modules.component';

declare let L: any; // Declaração para usar o Leaflet importado pelo CDN

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ToolbarComponent,
    HttpClientModule,
    CardModulesComponent
  ],
  providers: [MapaService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})

export class HomeComponent implements OnInit {
  map: any;

  constructor(private mapaService: MapaService) { }

  ngOnInit(): void {
    this.configMap();
    this.loadOcorrencias();
  }

  configMap() {
    this.map = L.map('map', {
      center: [-14.8593534, -40.8461146],
      zoom: 15
    });

    const defaultIcon = L.icon({
      iconUrl: iconUrl,
      shadowUrl: shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = defaultIcon;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  loadOcorrencias() {
    this.mapaService.getOcorrencias().subscribe({
      next: ocorrencias => {
        ocorrencias.forEach(ocorrencia => {
          const marker = L.marker([ocorrencia.latitude, ocorrencia.longitude]).addTo(this.map);
          marker.bindPopup(`<b>${ocorrencia.titulo}</b><br>${ocorrencia.descricao}</b><br>${ocorrencia.localizacao}
            `).openPopup();
        });
      },
      error: error => {
        console.error('Erro ao buscar ocorrências:', error);
      },
      complete: () => {
        console.log('Busca de ocorrências completada.');
      }
    });
  }

}
