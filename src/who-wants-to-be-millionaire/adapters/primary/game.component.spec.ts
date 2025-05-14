import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';
import { list } from 'postcss';
import {
  Pyramid,
  pyramidFactory,
} from '../../core-logic/usecases/answer-submission/pyramidFactory';
import { providePyramid } from '../../app.config';

Object.defineProperty(global.Element.prototype, 'animate', {
  value: () => ({
    onfinish: () => {},
    play: () => {},
    pause: () => {},
    reverse: () => {},
    finish: () => {},
    cancel: () => {},
  }),
  writable: true,
});

describe('Game component', () => {
  let pyramid: Pyramid;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    pyramid = pyramidFactory();
    TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [provideNoopAnimations(), providePyramid],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;
    component.pyramid = pyramid;
    fixture.detectChanges();
  });

  it('when the game starts, the pyramid should be reset', () => {
    expectPyramidStepHighlightStatus(0, true);
  });

  it.each`
    givenAnswer
    ${'A'}
    ${'B'}
  `('upon a right answer, the pyramid should increase', ({ givenAnswer }) => {
    giveAnswer(givenAnswer, fixture);
    expectPyramidStepHighlightStatus(1, true);
    expectPyramidStepHighlightStatus(0, false);
  });

  const giveAnswer = (
    answer: string,
    fixture: ComponentFixture<GameComponent>,
  ) => {
    fixture.debugElement
      .query(By.css(`[data-testid="${answer}:"]`))
      .nativeElement.click();
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
