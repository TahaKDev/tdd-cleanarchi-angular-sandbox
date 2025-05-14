import { Pyramid } from './pyramidFactory';

export const submitAnswer = (answer: string, pyramid: Pyramid) => {
  pyramid.reachedStepIndex++;
};
