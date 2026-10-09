export const queryKeys = {
  newsletters: {
    all: ['newsletters'] as const,
    byId: (id: string) => [id, 'newsletters'] as const,
  },
};
