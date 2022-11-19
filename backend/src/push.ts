import { VapidKeys, setVapidDetails } from 'web-push'

// https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html

export const vapidKeys: VapidKeys = {
	publicKey:
		'BNS7KgqQSDznecZCZUKnz03x1P-t0TNJfzp8zWboPmPGiYVa2YXyv7kHvM8bGt05UQRy-3-1Lf-LaOHrEAV8yEs',
	privateKey: 'CX4kA-_tHOH3qwz3Yqp1KAFnw9tHjp-XQrHPOBGRzBo',
}

setVapidDetails(
	'mailto:val@karpov.io',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)
