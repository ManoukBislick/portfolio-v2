import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/** Leave draft mode and see the published site again. */
export async function GET() {
	(await draftMode()).disable();
	redirect('/');
}
