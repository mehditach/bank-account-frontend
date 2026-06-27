import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chatbot } from '../chatbot';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat-widget',
  imports: [FormsModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidget {
  isOpen = signal<boolean>(false);
  messages = signal<ChatMessage[]>([
    { sender: 'bot', text: 'Bonjour ! Comment puis-je vous aider concernant votre compte bancaire ?' }
  ]);
  userInput: string = '';
  isLoading = signal<boolean>(false);

  constructor(private chatbotService: Chatbot) {}

  toggleChat() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    const question = this.userInput;
    this.messages.update(msgs => [...msgs, { sender: 'user', text: question }]);
    this.userInput = '';
    this.isLoading.set(true);

    this.chatbotService.askQuestion(question).subscribe({
      next: (response) => {
        this.messages.update(msgs => [...msgs, { sender: 'bot', text: response }]);
        this.isLoading.set(false);
      },
      error: () => {
        this.messages.update(msgs => [...msgs, { sender: 'bot', text: 'Erreur : service indisponible.' }]);
        this.isLoading.set(false);
      }
    });
  }
}