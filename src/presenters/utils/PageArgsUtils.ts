export default {
  extractId(args: string[]): number | null {
    if (args.length === 0) {
      return null;
    }

    const id = Number.parseInt(args[0], 10);

    if (Number.isNaN(id)) {
      return null;
    }

    return id;
  },
};
