import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.page.html',
  styleUrls: ['./read-page.page.scss'],
})
export class ReadPagePage implements OnInit {
  detailId: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    private router: Router, // Para navegação
    private activatedRoute: ActivatedRoute // Para obter parâmetros da rota
  ) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {


this.router.navigate(['/home-page']);
  }

}
closeAll(){
  this.router.navigate(['/home-page']);
}
}
