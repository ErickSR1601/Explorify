import { useMemo } from "react";
import DOMPurify from "dompurify";

/**
 * Hook to truncate HTML content while maintaining formatting.
 * 
 * @param {string} html - Original HTML content
 * @param {number} maxLength - Maximum number of visible characters
 * @returns {object} { safeContent, previewHTML }
 */
export default function useTruncatedHTML(html, maxLength = 1000) {
  const safeContent = useMemo(() => DOMPurify.sanitize(html), [html]);

  const previewHTML = useMemo(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = safeContent;

    let currentLength = 0;
    let truncatedHTML = "";

    const traverse = (node) => {
      if (currentLength >= maxLength) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const remaining = maxLength - currentLength;
        if (node.textContent.length <= remaining) {
          truncatedHTML += node.textContent;
          currentLength += node.textContent.length;
        } else {
          truncatedHTML += node.textContent.slice(0, remaining) + "...";
          currentLength = maxLength;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        truncatedHTML += `<${node.nodeName.toLowerCase()}`;
        for (const attr of node.attributes) {
          truncatedHTML += ` ${attr.name}="${attr.value}"`;
        }
        truncatedHTML += ">";
        node.childNodes.forEach(traverse);
        truncatedHTML += `</${node.nodeName.toLowerCase()}>`;
      }
    };

    tempDiv.childNodes.forEach(traverse);
    return truncatedHTML;
  }, [safeContent, maxLength]);

  return { safeContent, previewHTML };
}
