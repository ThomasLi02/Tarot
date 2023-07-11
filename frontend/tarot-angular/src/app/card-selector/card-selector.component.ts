import { Component, OnInit } from '@angular/core';
import { TarotService } from './tarotgpt';


@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {
  selectedCards: { card: string, label: string }[] = [];
  tarotCards: { name: string, isVisible: boolean }[] = [];
  userQuestion: string = '';
  response: string = '';

  constructor(private tarotService: TarotService) {}

  ngOnInit() {
    this.shuffleCards();
  }

  shuffleCards() {
    const cards = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
      'Judgment', 'The World'
    ];

    console.log()
    this.tarotCards = cards.map(name => ({ name, isVisible: false }));
    this.shuffleArray(this.tarotCards);
  }

  shuffleArray(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  selectCard(card: string) {
    if (this.selectedCards.length < 3) {
      let label: string;
      if (this.selectedCards.length === 0) {
        label = 'Past';
      } else if (this.selectedCards.length === 1) {
        label = 'Present';
      } else {
        label = 'Future';
      }
      this.selectedCards.push({ card, label });
    }

    if (this.selectedCards.length === 3) {
      this.showCardNames();
      this.sendQuestion();
    }
  }

  isCardSelected(card: string) {
    return this.selectedCards.some(selectedCard => selectedCard.card === card);
  }

  showCardNames() {
    this.tarotCards = this.tarotCards.map(card => {
      if (this.isCardSelected(card.name)) {
        card.isVisible = true;
      }
      return card;
    });
  }

  clearSelection() {
    this.selectedCards = [];
    this.tarotCards = this.tarotCards.map(card => {
      card.isVisible = false;
      return card;
    });
  }

  async sendQuestion() {
    const selectedCardNames = this.selectedCards.map(selectedCard => selectedCard.card);
    const question = `${this.userQuestion} Tarot Cards: ${selectedCardNames.join(', ')}`;
  
    try {
      this.response = await this.tarotService.promptTarotCardsAndQuestion(
        question,
        this.selectedCards[0].card,
        this.selectedCards[1].card,
        this.selectedCards[2].card
      );
      console.log('ChatGPT response:', this.response);
    } catch (error) {
      console.error('An error occurred while communicating with ChatGPT:', error);
    }
  }
}
