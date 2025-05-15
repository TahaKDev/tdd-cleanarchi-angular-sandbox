export const pyramidFactory = (levelIndexes?: number[]): Pyramid => ({
  reachedStepIndex: 0,
  levelIndexes: levelIndexes ?? [],
});

export type Pyramid = {
  reachedStepIndex: number;
  levelIndexes: number[];
};
