export interface AccordionData {
	title: string;
	content: string;
}

export const accordionData: AccordionData[] = [
	{
		title: 'How does it work?',
		content: `
            <p>Once you have ordered and received your samples, you can customise your Off-the-Peg Design Scheme by mixing and matching your favourites in your own unique way, or following the combinations shown in the renderings.</p>
            <p>When you have finalised your selection, we recommend that you contact your curtain maker, upholsterer or decorator to ascertain how much of each item you will need to order. Then simply complete your Order Request Form; we'll send you an invoice, and our suppliers will deliver directly to you.</p>
        `
	},
	{
		title: 'Fabric, Trimming and Wallpaper Prices',
		content: `
            <p>Following feedback from the initial launch of our Off-the-Peg Schemes, we are in the process of refreshing our designs. We are aiming to include fabrics that are no more than £150 per m (including VAT and discounts) and wallpapers that are no more than £190 per 10m roll.</p>
        `
	},
	{
		title: 'International Customers',
		content: `
            <p>If you live outside the UK, you'll be happy to hear that all of our suppliers ship internationally!</p>
            <p>Please note that international shipping charges may apply.</p>
            <p><strong>Note:</strong> A 3.46% surcharge will be applied to cover international payment fees.</p>
        `
	}
];
