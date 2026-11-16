import { test, expect } from '@fixtures/testFixtures';

test('GET post returns status 200', async ({ request }) => {
    const response = await request.get(`/posts/1`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1)
    expect(responseBody.userId).toBe(1)
    expect(typeof responseBody.title).toBe('string')
    expect(typeof responseBody.body).toBe('string')

});

test('GET post returns status 404', async ({ request }) => {
    const response = await request.get(`/posts/999999`);

    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody).toEqual({})

});

test('Sending a POST request', async ({ request }) => {
    const response = await request.post(`/posts`,
        {
            data: {
                title: 'Playwright API Testing',
                body: 'Learning API automation',
                userId: 1
            }
        });

    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();

    expect(typeof responseBody.id === 'number' )
    expect(responseBody.title).toBe('Playwright API Testing')
    expect(responseBody.body).toBe('Learning API automation')
    expect(responseBody.userId).toBe(1)
});