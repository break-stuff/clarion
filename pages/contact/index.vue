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
            title: 'Contact'
        };
    },
    head: {
        title: 'Contact',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Feel free to reach out with any questions or ideas.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'Feel free to reach out with any questions or ideas.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://projectclarion.com/contact'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Contact'
            }
        ]
    }
};
</script>
