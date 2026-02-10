import { getBlacklist, setBlacklist, isValidSellerId } from "../lib/storage";

const textareaEl = document.getElementById(
  "blacklist-input",
) as HTMLTextAreaElement;
const errorEl = document.getElementById(
  "validation-error",
) as HTMLElement;
const btnSave = document.getElementById("btn-save") as HTMLButtonElement;
const btnReset = document.getElementById("btn-reset") as HTMLButtonElement;
const toastContainer = document.getElementById(
  "toast-container",
) as HTMLElement;

let savedBlacklist: string[] = [];

const loadBlacklist = async (): Promise<void> => {
  savedBlacklist = await getBlacklist();
  textareaEl.value = savedBlacklist.join("\n");
  errorEl.classList.add("hidden");
};

const showToast = (message: string, type: "success" | "error"): void => {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} text-sm`;
  alert.textContent = message;
  toastContainer.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
};

const validate = (lines: string[]): string[] => {
  const invalidLines: string[] = [];
  for (const line of lines) {
    if (line && !isValidSellerId(line)) {
      invalidLines.push(line);
    }
  }
  return invalidLines;
};

btnSave.addEventListener("click", async () => {
  const lines = textareaEl.value
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const invalidLines = validate(lines);
  if (invalidLines.length > 0) {
    errorEl.textContent = `不正なID: ${invalidLines.join(", ")}`;
    errorEl.classList.remove("hidden");
    return;
  }

  errorEl.classList.add("hidden");

  const uniqueIds = [...new Set(lines)];
  await setBlacklist(uniqueIds);
  savedBlacklist = uniqueIds;
  showToast("保存しました", "success");
});

btnReset.addEventListener("click", () => {
  textareaEl.value = savedBlacklist.join("\n");
  errorEl.classList.add("hidden");
});

loadBlacklist();
