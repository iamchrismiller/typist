# The Typist  [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A Personal Typist for your website.


## Requirements

  A Modern Browser and non Modern (IE8+)

## Usage

  ```
  new Typist({
      elementId          : 'type-container',
      pointer            : '|',
      typeSpeed          : 100,
      timeout            : 3000,
      random             : false,
      pauseOnPunctuation : true,
      scrub              : true,
      start              : true
  }, [
      "Welcome to the Typist demo.",
      "A Sentence Shuffling Typewriter."
  ]);
  ```

  Options

    - elementId (string)
    - cursor (string) default : |
    - typeSpeed (int) default : 100
    - timeout (int) default : 1000
    - random (bool) default : true
    - scrub (bool) default : false
    - pauseOnPunctuation (bool) default : true
    - start (bool) default : false


## To View The Example

  visit http://iamchrismiller.github.io/typist/example/

  OR clone the repo and open the example

  `git clone https://github.com/iamchrismiller/typist.git`

  `npm install && grunt dev`

  `open http://127.0.0.1:8000/example/`


## Contributing

 In lieu of a formal style-guide, take care to maintain the existing coding style. Lint and test your code using grunt (dev).


## License

 Licensed under the MIT license.


## Release History

 * 2014-06-21   v0.1.0   Initial Release

## Author

 Chris Miller

---
