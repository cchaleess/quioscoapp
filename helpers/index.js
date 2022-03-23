export const formatMoney = value => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    };
