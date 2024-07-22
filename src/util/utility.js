export function serializedSelectionDatePicker(range) {
  const serializedSelection = {
    startDate: range.selection.startDate?.toString(),
    endDate: range.selection.endDate?.toString(),
    key: range.selection.key,
  };
  return serializedSelection;
}
