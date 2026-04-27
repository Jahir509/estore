import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition,faStar,faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-ratings',
  imports: [FontAwesomeModule,],
  templateUrl: './ratings.html',
  styleUrl: './ratings.css',
})
export class Ratings {
  score = input<number>(0);

  faStar = faStar;
  faEmptyStar = faEmptyStar
  faStarHalfStroke = faStarHalfStroke;


  // Computed Signal
  stars = computed(()=>{
    const value = Math.min(this.score(), 5);
    const icons: IconDefinition[] = []
    const solid = Math.floor(value);
    const half = value - solid >= 0.5 ? 1 : 0;

    for(let i=0; i<solid; i++){
      icons.push(this.faStar);
    }
    if(half){
      icons.push(this.faStarHalfStroke);
    }
    while(icons.length < 5){
      icons.push(this.faEmptyStar);
    }
    return [...icons]
  })
}
