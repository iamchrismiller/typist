/*global define, document*/

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.Typist = factory();
  }
}(this, function () {

  /**
   * Typist Constructor
   * A Typewriter For The Browser
   * @param options
   * @param sentences
   * @constructor
   */
  function Typist(options, sentences) {

    //The Collection of sentences
    this.sentences = typeof sentences === 'object' ? sentences : null;
    //The Current Sentence
    this.currentSentence = 0;
    //The Current Ix
    this.currentIx = 0;

    if (!this.sentences) {
      throw new Error("You must include an Array of sentences");
    }

    this.options = this._util.extend({
      elementId          : null,
      cursor             : "|",
      typeSpeed          : 100,
      timeout            : 1000,
      random             : true,
      scrub              : false,
      pauseOnPunctuation : true,
      start              : false
    }, options);


    //create and attach elements
    this.createContainers();

    if (this.options.random) {
      this.sentences.shuffle();
    }

    if (this.options.start === true) {
      this.start();
    }
  }

  Typist.prototype = {

    constructor : Typist,

    _util : {
      extend : function (o1, o2) {
        var o3 = {};
        for (var attr in o1) { o3[attr] = o1[attr]; }
        for (var attr2 in o2) { o3[attr2] = o2[attr2]; }
        return o3;
      }
    },

    start : function () {
      this.appendCursor();
      this.type();
    },

    stop : function () {
      this.removeCursor();

      if (this.typeInterval) {
        clearInterval(this.typeInterval);
      }

      if (this.scrubInterval) {
        clearInterval(this.scrubInterval);
      }
    },

    createContainers : function () {
      this.$el = document.getElementById(this.options.elementId);
      this.$inner = document.createElement('span');
      this.$el.appendChild(this.$inner);
    },

    type : function () {
      this.typeInterval = setInterval(this.updateText.bind(this), this.options.typeSpeed);
    },

    pause : function(mil, cb) {
      clearInterval(this.typeInterval);
      setTimeout(function() {
        //Callback Pause Finished
        if (typeof cb === 'function') cb();
        //Resume Typing
        this.type();
      }.bind(this), mil);
    },

    updateText : function () {
      var self = this,
        sentence = this.sentences[this.currentSentence];

      if (sentence.length > this.currentIx) {
        var isPunctuation = new RegExp("([,.!?;])$").test(sentence[self.currentIx]);

        self.$inner.textContent += sentence[self.currentIx];
        self.currentIx++;

        if (this.options.pauseOnPunctuation === true && isPunctuation) {
          this.pause(300);
        }
      } else {
        clearInterval(this.typeInterval);
        setTimeout(function() {
          self.changeSentence();
        }, this.options.timeout);
      }
    },

    scrubText : function (cb) {
      var self = this;
      this.scrubInterval = setInterval(function () {
        if (self.currentIx + 1 > 0) {
          self.$inner.textContent = self.$inner.textContent.substring(0, self.$inner.textContent.length - 1);
          self.currentIx--;
        } else {
          clearInterval(self.scrubInterval);
          cb();
        }
      }, 100);
    },

    updateSentenceIx : function () {
      if (this.currentSentence + 2 < this.sentences.length) {
        this.currentSentence++;
        this.currentIx = 0;
      } else {
        this.currentSentence = 0;
        this.currentIx = 0;
      }
    },

    changeSentence : function () {
      var self = this;

      if (this.$inner.textContent.length && this.options.scrub === true) {
        this.scrubText(function () {
          self.updateSentenceIx.call(self);
          self.type.call(self);
        });
      } else {
        self.$inner.textContent = '';
        self.updateSentenceIx();
        self.type.call(self);
      }
    },

    appendCursor : function () {
      var cursor = document.createElement('span');
      cursor.className = 'type-cursor';
      cursor.textContent = this.options.cursor;
      this.$el.appendChild(cursor);
    },

    removeCursor : function () {
      this.$el.textContent = this.$el.textContent.replace(this.options.cursor, '');
    }
  };

  //Shim a simple Array Shuffle
  if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
      var i = this.length, j, tmp;
      if (i === 0) return this;

      while (--i) {
        j = ~~(Math.random() * (i + 1));
        tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
      }
      return this;
    };
  }

  return Typist;
}));