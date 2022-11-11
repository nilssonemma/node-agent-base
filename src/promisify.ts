import {
	createAgent
} from './index';

type LegacyCallback = (
	req: createAgent.ClientRequest,
	opts: createAgent.RequestOptions,
	fn: createAgent.AgentCallbackCallback
) => void;

export default function promisify(fn: LegacyCallback): createAgent.AgentCallbackPromise {
	return function(this: createAgent.Agent, req: createAgent.ClientRequest, opts: createAgent.RequestOptions) {
		return new Promise((resolve, reject) => {
			fn.call(
				this,
				req,
				opts,
				(err: Error | null | undefined, rtn?: createAgent.AgentCallbackReturn) => {
					if (err) {
						reject(err);
					} else {
						resolve(rtn!);
					}
				}
			);
		});
	};
}
