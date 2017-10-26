
export default function modifyHistory(history) {
  if (history.wModified) return;

  history.wModified = true;

  history.goBackB = history.goBack;
  history.goBack = (backTo) => {
    if (!backTo) {
      history.goBackB();
      return;
    }
    const last = history.entries[history.length - 1] && history.entries[history.length - 1].pathname;
    if (last === backTo) {
      history.goBackB();
    } else {
      history.replace(backTo);
    }
  };
}
