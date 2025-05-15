import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  Pyramid,
  pyramidFactory,
} from '../../core-logic/usecases/answer-submission/pyramidFactory';
import { FakeQuestionGateway } from '../secondary/gateways/fakeQuestionGateway';
import { provideGameDependencies } from '../../app.config';

describe('Game component', () => {
  let pyramid: Pyramid;
  let fixture: ComponentFixture<GameComponent>;
  let questionGateway: FakeQuestionGateway;

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    pyramid = pyramidFactory();
    TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [provideNoopAnimations(), ...provideGameDependencies],
    })
      .overrideProvider('QUESTION_GATEWAY', { useValue: questionGateway })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('when the game starts, the pyramid should be reset', () => {
    expectPyramidStepHighlightStatus(0, true);
  });

  it.each`
    givenAnswer | correctAnswer
    ${'A'}      | ${'A'}
    ${'B'}      | ${'B'}
  `(
    'upon a right answer, the pyramid should increase',
    async ({ givenAnswer, correctAnswer }) => {
      // GIVEN
      questionGateway.correctAnswer = correctAnswer;
      // WHEN
      await giveAnswer(givenAnswer, fixture);
      // THEN
      expectPyramidStepHighlightStatus(1, true);
      expectPyramidStepHighlightStatus(0, false);
    },
  );

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
});
