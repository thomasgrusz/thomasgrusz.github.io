export function injectContent(content, language, cvTemplate) {
  return cvTemplate.replace(
    /data-content="([^"]+)"[^>]*>([^<]*)</g,
    (match, key, contentBetweenTags) => {
      return content[key]
        ? match.replace(contentBetweenTags, content[key][language])
        : match;
    }
  );
}
