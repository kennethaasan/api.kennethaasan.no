import { Parser } from 'htmlparser2';
import getFetchOptions from '../utils/getFetchOptions';

export default function getFinnAd(id) {
  return new Promise((resolve, reject) => {
    const url = `https://m.finn.no/${id}`;

    fetch(url, getFetchOptions())
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        }

        throw new Error(
          `Finn fails with ${response.status} ${response.statusText} at ${url}`
        );
      })
      .then(text => {
        const data = {
          title: null,
          description: null,
          url: null,
          sold: false,
          leased: false,
          image: null,
          images: null,
        };

        const parser = new Parser(
          {
            onopentag: (name, attributes) => {
              if (name === 'meta' && attributes) {
                if (attributes.property === 'og:title') {
                  data.title = attributes.content;
                }

                if (attributes.property === 'og:description') {
                  data.description = attributes.content;
                }

                if (attributes.property === 'og:url') {
                  data.url = attributes.content;
                }

                if (attributes.property === 'og:image') {
                  data.image = Object.assign({}, data.image, {
                    src: attributes.content,
                  });
                }

                if (attributes.property === 'og:image:width') {
                  data.image = Object.assign({}, data.image, {
                    width: attributes.content,
                  });
                }

                if (attributes.property === 'og:image:height') {
                  data.image = Object.assign({}, data.image, {
                    height: attributes.content,
                  });
                }
              }

              if (
                name === 'span' &&
                attributes &&
                attributes.class === 'objectstatus sold'
              ) {
                data.sold = true;
                data.leased = true;
              }

              if (
                name === 'img' &&
                attributes &&
                attributes.class === 'centered-image' &&
                attributes['aria-label'] === 'Galleribilde'
              ) {
                if (!data.images) {
                  data.images = [];
                }

                const image = {
                  src: attributes.src || attributes['data-src'] || null,
                  srcset: attributes.srcset ||
                    attributes['data-srcset'] ||
                    null,
                  sizes: attributes.sizes || null,
                  alt: attributes.alt || null,
                  index: attributes['data-index'] || null,
                };

                data.images.push(image);
              }
            },
            onend: () => resolve(data),
          },
          { decodeEntities: true }
        );

        parser.write(text);
        parser.end();
      })
      .catch(reject);
  });
}
