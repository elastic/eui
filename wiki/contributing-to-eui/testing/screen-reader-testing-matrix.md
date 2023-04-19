# Screen reader testing matrix
This document was created based on analytics compiled in July 2022. The analytics reflect the most common browsers, screen resolutions, and operating systems among Elastic Cloud users. The data was compiled anonymously and will only be used to inform testing priorities.

## Testing tiers

* **Tier 1 (T1):** Should be tested for all new components or significant experience updates
* **Tier 2 (T2):** Test as time allows during a regular PR review cycle
* **Tier 3 (T3):** Test as requested by customers or teammates

## Testing matrix

| | JAWS<br/>(Win) | NVDA<br/>(Win) | VoiceOver<br/>(MacOS) | Orca<br/>(Linux) | iOS VoiceOver<br/>(Apple devices) | TalkBack<br/>(Android devices) |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Chrome | T1 | T1 | ❌ | T3 | ❌ | T3 |
| Firefox | T2 | T1 | T2 | T3 | ❌ | ❌ |
| Edge | T2 | T2 | ❌ | ❌ | ❌ | ❌ |
| Safari | ❌ | ❌ | T1 | ❌ | T3 | ❌ |

## Resources

### Desktop screen readers
* [Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
* [Keyboard shortcuts for JAWS](https://webaim.org/resources/shortcuts/jaws)
* [Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
* [Keyboard Shortcuts for NVDA](https://webaim.org/resources/shortcuts/nvda)
* [Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)

### Mobile device screen readers
* [VoiceOver on Mobile](https://webaim.org/articles/voiceover/mobile)
* [Using TalkBack to Evaluate Web Accessibility](https://webaim.org/articles/talkback/)
