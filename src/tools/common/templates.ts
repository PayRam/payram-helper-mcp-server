export const codeTemplate = (
  strings: TemplateStringsArray,
  ...values: Array<string | number>
): string => {
  return strings
    .reduce<string>((acc, segment, index) => {
      const value = index < values.length ? String(values[index]) : '';
      return acc + segment + value;
    }, '')
    .trim();
};
