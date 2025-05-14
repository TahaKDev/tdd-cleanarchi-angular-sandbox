export const pyramidFactory = (): Pyramid => ({
  reachedStepIndex: 0,
});

export type Pyramid = {
  reachedStepIndex: number;
};
