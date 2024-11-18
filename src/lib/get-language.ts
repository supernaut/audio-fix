export function getLanguage(input: string | undefined): string {
    const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return input && languageNames.of(input) || "Unknown language";
}
