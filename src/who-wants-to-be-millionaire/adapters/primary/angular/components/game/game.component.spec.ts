import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FakeQuestionGateway } from '../../../../secondary/gateways/fakeQuestionGateway';
import { provideGameDependencies } from '../../../../../app.config';
import { Question } from '../../../../../core-logic/models/question';
import { beforeEach, it } from 'vitest';

describe('Game component', () => {
  let fixture: ComponentFixture<GameComponent>;
  let questionGateway: FakeQuestionGateway;

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [provideNoopAnimations(), ...provideGameDependencies],
    })
      .overrideProvider('QUESTION_GATEWAY', { useValue: questionGateway })
      .compileComponents();
    questionGateway.currentQuestion = aQuestion;
    fixture = TestBed.createComponent(GameComponent);
  });

  describe('As soon as the game starts', () => {
    it('should not displayed any question bloc BEFORE having retrieved the first question', async () => {
      const compiled = fixture.debugElement.query(
        By.css(`[data-testid="question-bloc"]`),
      );
      expect(compiled).toBeNull();
    });

    it('should retrieve the first question', async () => {
      fixture.detectChanges(); // ngOnInit triggered, use case retrieveQuestion triggered
      await fixture.whenRenderingDone(); // wait for async operations (questionGateway)
      fixture.detectChanges(); // wait for the update of the template with the updated signal

      const compiled = fixture.debugElement.query(
        By.css(`[data-testid="question-bloc"]`),
      ).nativeElement as HTMLElement;

      expect(compiled.textContent).toContain(aQuestion.label);
    });

    it('the pyramid should be reset', () => {
      fixture.detectChanges();
      expectPyramidStepHighlightStatus(0, true);
    });
  });

  describe('As soon as the question is retrieved', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();
    });

    it.each`
      givenAnswer | correctAnswer
      ${'A'}      | ${'A'}
      ${'B'}      | ${'B'}
    `(
      'upon a right answer, the pyramid should increase',
      async ({ givenAnswer, correctAnswer }) => {
        // GIVEN
        questionGateway.correctAnswerByQuestionId = { 1: correctAnswer };
        // WHEN
        await giveAnswer(givenAnswer, fixture);
        // THEN
        expectPyramidStepHighlightStatus(1, true);
        expectPyramidStepHighlightStatus(0, false);
      },
    );
  });

  const giveAnswer = async (
    answer: string,
    fixture: ComponentFixture<GameComponent>,
  ) => {
    fixture.debugElement
      .query(By.css(`[data-testid="${answer}:"]`))
      .nativeElement.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    fixture.detectChanges();
  };

  const expectPyramidStepHighlightStatus = (
    stepIndex: number,
    highlight: boolean,
  ) => {
    const listItems = retrieveAllPyramidStepsElements();
    expect(
      Array.from(
        listItems[listItems.length - stepIndex - 1].nativeElement.classList,
      ).join(' '),
    ).toEqual(highlight ? 'mb-2 p-2 rounded-full bg-orange-500' : 'mb-2');
  };

  const retrieveAllPyramidStepsElements = () => {
    return fixture.debugElement.queryAll(By.css('.pyramid-values li > div'));
  };

  const aQuestion: Question = {
    id: '1',
    label: "Que signifie l'acronyme TDD ?",
    possibleAnswers: {
      A: 'Third-Driven Development',
      B: 'Test-Driven Development',
      C: 'Test-Deep Development',
      D: 'Test-Driven Design',
    },
  };
});
