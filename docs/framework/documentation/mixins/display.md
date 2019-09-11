# Display Mixins

## Screen Reader Only

This mixin is used for hiding content but still making it visible for assistive technologies like screen readers.

```scss
@mixin screen-reader-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}
```

### Usage

One of the most useful places for this is in a utility class.

```scss
.sr-only {
    @include screen-reader-only();
}
```

Another useful place is for input fields or buttons where meaning is implied visually, but labels are needed to proved support for screen readers

#### Search Field Example

```html
<div class="search">
    <label for="search-input" class="search-label">Search Website</label>
    <input type="search" id="search-input" class="search-input" />
    <button class="search-button">
        <span class="text">Search</span>
        <i class="icon"></i>
    </button>
</div>
```

```scss
.search {
    display: flex;

    .search-label {
        @include screen-reader-only();
    }

    .search-input {
        ...
    }

    .search-button {
        .text {
            @include screen-reader-only();
        }

        .icon {
            ...
        }
    }
}
```

## Full Width

A common issue that developers run into is how to set an image or a banner to the full width of the screen when the parent container has a `max-width` set that is less than the screen size. Using the `full-width` directive will allow you to override any width restrictions for a `div` and allow it span the full width of the screen.

```scss
.ad-banner {
    background-color: color(light); // sets the background to the light color
    color: text-color(light);       // dynamically sets the text color to a color with sufficient color contrast
    @include full-width();
}
```

## Full Height

Similar to the `full-width` mixin, there is also a `full-height` directive. this works great for things like side bars and navigation drawers.

```scss
.side-bar {
    width: 25rem;
    left: 0;
    @include full-height();
}
```

## Full Screen

The `full-screen` mixin is just a combination of the `full-width` and `full-height` mixins. This works great for things like back-drops for modals and dialogs.

```scss
.modal {
    background-color: color(dark, 0.5); // uses the dark color and sets the opacity to 0.5
    z-index: z(lg);
    @include full-screen();

    .modal-body {
        max-width: 500px;
        @include mx(auto); // horizontally centers the modal
        @include my(lg);   // adds a large margin to the top and bottom of the modal
        @include border(); // sets the border to the default style
    }
}
```
