/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as ReactDOM from 'react-dom'
import { Theme } from 'common/theme';
import { Banner } from 'common/components';
import { formatRelative } from 'date-fns';
import { isOnOrAfterToday } from '../common/date';

export const createAddressBanner = (address: { address: Catalyst.Address; dispute: Catalyst.Dispute }, node: HTMLElement) => {
    const upcomingEvents = address.dispute.relatedEvents.filter(({ dateFrom }) => isOnOrAfterToday(new Date(dateFrom)))

    ReactDOM.render(
        <Theme>
            <Banner>
                <h3>Class Struggle Alert</h3>
                <h2>{address.dispute.name}</h2>
                <h5>{address.dispute.dateFrom}—</h5>
                <p>{address.dispute.description}</p>
                <a href={address.dispute.source} sx={{ border: '1px solid red', display: 'inline-block', p: 2, fontWeight: 'bold' }}>Learn more &rarr;</a>
                <h5 sx={{ mt: 2 }}>Upcoming dispute dates</h5>
                {upcomingEvents.length > 0 && <div>
                    {upcomingEvents.slice(0, 3).map((event, i) => (
                        <div key={i} sx={{ mb: 2 }}>
                            <div><b>{event.name}</b> -- {formatRelative(new Date(event.dateFrom), new Date())}</div>
                            <div>at {event.relatedAddresses.map(a => a.address).join(", ")}</div>
                        </div>
                    ))}
                </div>}
            </Banner>
        </Theme>,
        node
    )
}