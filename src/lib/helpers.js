export function validateCreateChallengeForm({
  icon,
  title,
  description,
  totalEntries,
  frequency
}) {
  let isValid = true;

  if (!icon.trim()) {
    isValid = false;
  }

  if (!title.trim()) {
    isValid = false;
  }

  if (!description.trim()) {
    isValid = false;
  }

  if (
    totalEntries.trim() === "" ||
    Number(totalEntries) < 0 ||
    Number(totalEntries) > 1000
  ) {
    isValid = false;
  }

  if (frequency !== "daily" && frequency !== "weekly") {
    isValid = false;
  }

  return isValid;
}
