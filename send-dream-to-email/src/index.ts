/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Resend } from 'resend';

interface Env {
	RESEND_TOKEN: string;
	EMAIL: string;
}

interface RequestPayload {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
	services: string[];
}

const corsHeaders = {
	"Access-Control-Allow-Origin": "http://localhost:4321",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default {
	async fetch(request, env, ctx): Promise<Response> {

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: corsHeaders
			})
		}

		if (request.method !== "POST") {
			return new Response("Method Not Allowed", { status: 405 });
		}

		if (request.url.endsWith("/api/contact")) {
			try {
				const payload: RequestPayload = await request.json();
				await sendEmail(env, payload);
				return new Response("Email sent successfully", { 
					status: 200,
					headers: corsHeaders
				});
			} catch (error) {
				return new Response("Failed to send email", { status: 500 });
			}
		}

		return new Response(`Hello World!`);
	},
} satisfies ExportedHandler<Env>;


async function sendEmail(env: Env, payload: RequestPayload) {
	const resend = new Resend(env.RESEND_TOKEN);
	
	const { firstName, lastName, email, message, services } = payload;
	
	const servicesList = services.length > 0 ? `<p>Services: ${services.join(', ')}</p>` : '';

	const htmlContent = `
		<h1>New Contact Form Submission</h1>
		<p><strong>First Name:</strong> ${firstName}</p>
		<p><strong>Last Name:</strong> ${lastName}</p>
		<p><strong>Email:</strong> ${email}</p>
		${servicesList}
		<p><strong>Message:</strong></p>
		<p>${message}</p>
	`;

	try {
		const { data } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [env.EMAIL],
			subject: 'New Contact Form Submission',
			html: htmlContent,
		});

		// console.log('Email sent:', data);

		return data;
	} catch (error) {
		throw new Error('Failed to send email');
	}
}