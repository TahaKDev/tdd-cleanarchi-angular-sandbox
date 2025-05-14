import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  Pyramid,
  pyramidFactory,
} from '../../core-logic/usecases/answer-submission/pyramidFactory';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Game component', () => {
  let pyramid: Pyramid;
  let fixture: ComponentFixture<GameComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    pyramid = pyramidFactory();
    TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;
    component.pyramid = pyramid;
    fixture.detectChanges();
  });

  it('when the game starts, the pyramid should be reset', () => {
    expectPyramidStepHighlightStatus(0, true);
  });

  it.each`
    givenAnswer | isRightAnswer
    ${'A'}      | ${true}
    ${'B'}      | ${false}
  `(
    'upon a right answer, the pyramid should increase',
    async ({ givenAnswer, isRightAnswer }) => {
      httpTestingController
        .expectOne('https://api.example.com/validate-answer')
        .flush(isRightAnswer);
      await giveAnswer(givenAnswer, fixture);
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
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
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
