<template>
    <div>
        <h1>Contact</h1>

        <p>
            Feel free to reach out on Twitter
            <a
                href="https://twitter.com/stuffbreaker"
            >@stuffbreaker</a> or send me a message here.
            I will get back to you as soon as possible. Thanks!
        </p>

        <form method="POST" action="https://formspree.io/burton@breakstuff.io">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input name="email" type="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea name="message" class="form-control"></textarea>
            </div>
            <button class="btn btn-primary">Send</button>
        </form>
        <br>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Clarion Style Framework Documentation'
        };
    },
    head: {
        title: 'Clarion Style Framework Documentation',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how adding a style framework to your project can make development faster and more effective.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'See how adding a style framework to your project can make development faster and more effective.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content:
                    'https://projectclarion.com/style-framework/documentation'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Clarion Style Framework Documentation'
            }
        ]
    }
};
</script>
