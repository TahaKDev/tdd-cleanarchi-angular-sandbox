export interface QuestionGateway {
  submitAnswer(givenAnswer: string): Promise<boolean>;
}
